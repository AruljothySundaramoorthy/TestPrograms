function percentage(percent, total) {
    return ((percent / 100) * total).toFixed(2)
}


const percentResult = percentage(3, 1000);
console.log(percentResult);