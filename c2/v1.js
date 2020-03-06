var fs = require ('fs');

const filename= 'data.txt';

fs.writeFile(filename, 'blah blah blah', (err) => {
    if(err){
        console.error(err);
        return;
    }
    console.log('Successfull write');
});

fs.writeFile(filename, 'blah blah blah', (err) => {
    if(err){
        console.error(err);
        return;
    }
    console.log('Successfull write');
    fs.appendFile(filename, 'hahaha', (err) => {
        if(err){
            console.error(err);
            return;
        }
        console.log('Successfull append');
        fs.readFile(filename,'utf8', (err, data) => {
            if(err){
                console.error(err);
                return;
            };
            console.log(data);
        });
    });
});    

const write = (fname, data) => {
    return new Promise((success, fail) => {
        fs.writeFile(fname, data, (err) => {
            if(err){
                return fail(err);
            }
            return success();
        })
    });
};

const append = (fname, data) => {
    return new Promise ((success, fail) => {
        fs.appendFile(fname, data, (err) => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
};

const read = (fname) => {
    return Promise((success,fail) => {
        fs.readFile(fname, 'utf8', (err, data) => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
};

let file2='data2.txt';

write(file2, 'test test test')
    .then(() => {
        return append(file2, 'TEST TEST TEST');
    })
    .then(() => {
        return read(file2)
    })
    .then((data) => {
        console.log(data);
    })
    .catch(err => {
        console.error(err)
    });
