export const getTabName = (blockchain_key: string) => {
    const tab_names = [
        {
            name: 'Bitcoin',
            blockchain_key: 'btc-main'
        },
        {
            name: 'ERC20-T',
            blockchain_key: 'eth-testnet'
        },
        {
            name: 'TRON20-T',
            blockchain_key: 'tron-test'
        },
        {
            name: 'BEP20-T',
            blockchain_key: 'bsc-testnet'
        },
        {
            name: 'ERC20',
            blockchain_key: 'eth-main'
        },
        {
            name: 'TRON20',
            blockchain_key: 'trx-main'
        },
        {
            name: 'BEP20',
            blockchain_key: 'bsc-main'
        }
    ];
    const foundTab = tab_names.find(tab_name => tab_name.blockchain_key.toLowerCase() === blockchain_key.toLowerCase());
    return foundTab ? foundTab.name : 'not found';
}