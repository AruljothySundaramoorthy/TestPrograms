var fs = require('fs');
function rename_or_copy_and_delete(oldPath, newPath, callback) {

    function copy_and_delete() {
        var readStream = fs.createReadStream(__dirname + oldPath);
        var writeStream = fs.createWriteStream(__dirname + newPath);

        readStream.on('error', callback);
        writeStream.on('error', callback);
        readStream.on('close',
            function () {
                fs.unlink(oldPath, callback);
            }
        );

        readStream.pipe(writeStream);
    }

    fs.rename(__dirname + oldPath, __dirname + newPath,
        function (err) {
            if (err) {
                if (err.code === 'EXDEV') {
                    copy_and_delete();
                } else {
                    callback(err);
                }
                return;
            }
            callback();
        }
    );
}

rename_or_copy_and_delete('/test/taylor_swift.xlsx', '/test1/taylor_swift.xlsx', function (err, res) {
    console.log(err);
    console.log(res);
});




























