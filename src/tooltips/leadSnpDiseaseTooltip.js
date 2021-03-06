/* global tnt:true */
let tooltip = {};
function leadSnpDiseaseTooltip(d) {
    tooltip = tnt.tooltip.table()
        .id('leadSnpDiseaseTooltip')
        .show_closer(false)
        .width(120)
        .call(this, {
            header: 'GWAS evidence',
            rows: [
                {
                    label: 'GWAS variant',
                    value: d.leadSnpId,
                },
                {
                    label: 'Disease',
                    value: d.efoName,
                },
                {
                    label: 'GWAS p-value',
                    value: d.pvalue.toPrecision(2),
                },
                // {
                //     label: 'source',
                //     value: d.lead_snp.source,
                // },
            ],
        });
    return tooltip;
}
leadSnpDiseaseTooltip.close = () => { tooltip.close(); };

export default leadSnpDiseaseTooltip;
