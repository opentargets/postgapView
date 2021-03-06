/* global tnt:true */
/* global d3:true */

import api from 'tnt.api';
import tntRest from 'tnt.rest';
import spinner from 'cttv.spinner';
import axios from 'axios';
import { getData, getEnsemblSnps } from './data';
import sequenceTrack from './tracks/sequenceTrack';
import geneLabelTrack from './tracks/geneLabelTrack';
import infoTrack from './tracks/infoTrack';
// import legendTrack from './tracks/legendTrack';
import {
    // sequence as sequenceTrack,
    transcript as transcriptTrack,
    snpLDMarker as snpLDMarkerTrack,
    snpLeadMarker as snpLeadMarkerTrack,
    geneLdSnpConnector as geneLdSnpConnectorTrack,
    snpConnector as snpConnectorTrack,
    snpDiseaseConnector as snpDiseaseConnectorTrack,
    diseaseLabel as diseaseNameLabelTrack,
} from './tracks';
// import cttvRestApi from 'cttv.api';

const rest = tntRest()
    .protocol('https')
    // .domain('grch37.rest.ensembl.org');
    .domain('rest.ensembl.org');

const config = {
    rest,
    gene: 'ENSG00000134243', // SORT1
    // disease: 'EFO_0004518', // Myocardial infarction
    disease: 'EFO_0004261', // Myocardial infarction
    cttvApi: null, // cttvRestApi().prefix("https://www.targetvalidation.org/api/"),
    width: 950,
};

export default function () {
    const render = function (container, container2) {
        getData(config.gene, config.cttvApi)
            .then((resp) => {
                buildBrowser(resp.data, container, container2);
            })
            .catch((err) => {
                console.trace(err.message);
            });
    };

    api(render)
        .getset(config);
    return render;
}

function buildBrowser(postgapData, container, container2) {
    const cluster = getCluster(postgapData);

    cluster.then((ensemblSnpsForGene) => {
        const snpsExtent = calcExtent(ensemblSnpsForGene);
        let chr;
        ensemblSnpsForGene.some(snp => {
            const mapsToGenome = (Object.keys(snp).indexOf('failed') === -1);
            if (mapsToGenome) chr = snp.mappings[0].seq_region_name;
            return mapsToGenome; // cut out on first success
        });
        // const chr = ensemblSnpsForGene[0].mappings[0].seq_region_name;


        const genome = tnt.board.genome()
            .species('human')
            .chr(chr)
            .from(snpsExtent[0])
            .to(snpsExtent[1])
            // .extend_canvas({left: 100, right: 100}) // adds space around pannable space
            .width(config.width);
        genome.rest().protocol('https');

        genome(container);
        genome
            .zoom_in(100)
            .add_track(sequenceTrack.call(genome, config))
            .add_track(geneLabelTrack.call(genome, config))
            .add_track(transcriptTrack.call(genome, config))
            .add_track(geneLdSnpConnectorTrack.call(genome, config))
            .add_track(snpLDMarkerTrack.call(genome, config))
            .add_track(snpConnectorTrack.call(genome, config))
            .add_track(snpLeadMarkerTrack.call(genome, config))
            .add_track(snpDiseaseConnectorTrack.call(genome, config))
            .add_track(diseaseNameLabelTrack.call(genome, config))
            .add_track(infoTrack.call(genome, config));
            // .add_track(legendTrack.call(genome, config));
        genome.start();
        // console.log('genome started...');
    });

    //
}

function calcExtent(arr) {
    let minPos = Infinity;
    let maxPos = -Infinity;

    arr.forEach((d) => {
        if (d.mappings.length) {
            if (d.mappings[0].start < minPos) minPos = d.mappings[0].start;
            if (d.mappings[0].end > maxPos) maxPos = d.mappings[0].end;
        }
    });
    return [minPos, maxPos];
}

// Takes the cluster and call the ensembl rest api with the gene and the lead snps
// to know the positions (and calculate the extent for the visualisation)
function getCluster(data) {
    const otSnps = data.map((d) => {
        const fullId = d.variant.id;
        const snpId = fullId.split('/')[4];
        // const snpId = d.variant.id;
        return snpId;
    });
    const otSnpsSet = new Set(otSnps);
    const allPromises = getEnsemblSnps(config.rest, Array.from(otSnpsSet));
    return axios.all(allPromises)
        .then((arrs) => arrs.reduce((acc, val) => [...acc, ...Object.keys(val.body).map((k) => val.body[k])], []));
}

// function getEnsemblSnps(otSnps) {
//     // Get all the snps coordinates in chunks of 200
//     const maxPerCall = 200;
//     const allPromises = [];
//     for (let i = 0; i < otSnps.length; i += maxPerCall) {
//         const snpsChunk = otSnps.slice(i, (i + maxPerCall));
//         const newPromise = getEnsemblSnps1Call(snpsChunk);
//         allPromises.push(newPromise);
//     }
//     return allPromises;
// }
//
// function getEnsemblSnps1Call(snpsId) {
//     const url = rest.url()
//         .endpoint('variation/:species')
//         .parameters({
//             species: 'human',
//         });
//     return rest.call(url, { ids: snpsId });
// }

// Takes the lead snps and calls the ensembl api with the gene and the lead snps
// to know the positions (and calculate the extent for the visualisation)
// function getLeadSnps(data) {
//     const leadSnps = new Set();
//     data.forEach((x) => {
//         leadSnps.add(x.lead_snp.rsid);
//     });
//
//     const leadSnpsPromise = getEnsemblSnps(Array.from(leadSnps));
//     const genePromise = getGene(gene);
//
//     return axios.all([leadSnpsPromise, genePromise]);
// }
