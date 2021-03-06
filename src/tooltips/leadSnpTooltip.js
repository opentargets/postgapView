/* global tnt:true */
let tooltip = {};
function leadSnpTooltip(d) {
    tooltip = tnt.tooltip.table()
        .id('leadSnpTooltip')
        .show_closer(false)
        .width(120)
        .call(this, {
            header: d.id,
            rows: [
                // TODO: What to show about a lead snp?
                // * top diseases?
                // * max r2?
                // * max -logp?

                // {
                //     label: 'disease',
                //     value: d.lead_snp.disease_name,
                // },
                // {
                //     label: 'log p-value',
                //     value: parseFloat(d.lead_snp.log_p_value).toPrecision(2),
                // },
                // {
                //     label: 'source',
                //     value: d.lead_snp.source,
                // },
            ],
        });
    return tooltip;
}
leadSnpTooltip.close = () => { tooltip.close(); };

export default leadSnpTooltip;
