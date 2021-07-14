function loadscadaheatmap(e) {
    let statustag = '';
    switch (e.parameters.IS_HEALTHY) {
        case !e.parameters.IS_HEALTHY:
            statustag = 'inv-comm-error';
            break;
        case 1 == (1 & e.parameters.INV_RUN_STS):
            statustag = 'inv-stop-mode';
            break;
        case 4 == (4 & e.parameters.INV_RUN_STS):
            statustag = 'inv-standby-mode';
            break;
        case 8 == (8 & e.parameters.INV_RUN_STS):
            statustag = 'inv-grid-connected-mode';
            break;
        case 32 == (32 & e.parameters.INV_RUN_STS):
            statustag = 'inv-power-limit-stop-mode';
            break;
        case 64 == (64 & e.parameters.INV_RUN_STS):
            statustag = 'inv-fault-mode';
            break;
        case 128 == (128 & e.parameters.INV_RUN_STS):
            statustag = 'inv-power-limit-mode';
            break;
        case 256 == (256 & e.parameters.INV_RUN_STS):
            statustag = 'inv-derating-fault-mode';
            break;
        default:
            statustag = 'inv-running-mode'
    }
    return statustag
}


const device = {
    parameters: {
        IS_HEALTHY: true,
        INV_RUN_STS: 1

    }
}
console.log(loadscadaheatmap(device))