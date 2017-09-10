/* global tnt:true */


function gTooltip(d) {
    return {
        header: d.external_name,
        rows: [
            {
                label: 'id',
                value: d.gene_id,
            },
            {
                label: 'desc',
                value: d.description,
            },
        ],
    };
}

function tTooltip(d) {
    console.log(d);
    return {
        header: d.display_name,
        rows: [
            {
                label: 'type',
                value: d.object_type,
            },
            {
                label: 'biotype',
                value: d.biotype,
            },
        ],
    };
}

export function geneTooltip(d) {
    const table = tnt.tooltip.table()
        .width(120);

    if (d.isGene) {
        table
            .call(this, gTooltip(d));
    }
    else {
        table
            .call(this, tTooltip(d));
    }
}

export function leadSnpTooltip(d) {
    console.log(d);
    return tnt.tooltip.table()
        .width(120)
        .call(this, {
            header: d.lead_snp.rsid,
            rows: [
                {
                    label: 'disease',
                    value: d.lead_snp.disease_name,
                },
                {
                    label: 'log p-value',
                    value: parseFloat(d.lead_snp.log_p_value).toPrecision(2),
                },
                {
                    label: 'source',
                    value: d.lead_snp.source,
                },
            ],
        });
}

export function ldSnpTooltip(d) {
    console.log(d);
    return tnt.tooltip.table()
        .width(120)
        .call(this, {
            header: d.rsid,
            rows: [
                {
                    label: 'Associated gene',
                    value: d.gene_symbol,
                },
                {
                    label: 'Gene Rank',
                    value: d.fg_scores.rank,
                },
                {
                    label: 'Score',
                    value: d.fg_scores.postgap_score,
                },
                {
                    label: 'Scores',
                    value: '',
                },
                {
                    label: 'Fantom5',
                    value: d.fg_scores.fantom5_score,
                },
                {
                    label: 'GTEx',
                    value: d.fg_scores.gtex_ecore, // Typo in the data!
                },
                {
                    label: 'DHS',
                    value: d.fg_scores.dhs_score,
                },
                {
                    label: 'Pchic',
                    value: d.fg_scores.pchic_score,
                },
                {
                    label: 'Regulome',
                    value: d.fg_scores.regulome_score,
                },
            ],
        });
}
