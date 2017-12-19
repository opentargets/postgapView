export function geneLdSnpTooltip(d) {
    const tooltip = tnt.tooltip.table()
        .id('geneLdSnpTooltip')
        .show_closer(false)
        .width(120)
        .call(this, {
            header: d.id,
            rows: [
                // TODO: What to show about a gene - ld snp?
                // * gene name, snp id
                // * funcgen scores?

                // {
                //     label: 'Associated gene',
                //     value: d.gene_symbol,
                // },
                // {
                //     label: 'Gene Rank',
                //     value: d.fg_scores.rank,
                // },
                // {
                //     label: 'Score',
                //     value: d.fg_scores.postgap_score,
                // },
                // {
                //     label: 'Scores',
                //     value: '',
                // },
                // {
                //     label: 'Fantom5',
                //     value: d.fg_scores.fantom5_score,
                // },
                // {
                //     label: 'GTEx',
                //     value: d.fg_scores.gtex_ecore, // Typo in the data!
                // },
                // {
                //     label: 'DHS',
                //     value: d.fg_scores.dhs_score,
                // },
                // {
                //     label: 'Pchic',
                //     value: d.fg_scores.pchic_score,
                // },
                // {
                //     label: 'Regulome',
                //     value: d.fg_scores.regulome_score,
                // },
            ],
        });
    return tooltip;
}
