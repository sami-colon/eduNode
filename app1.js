const args = require('yargs').argv;
const fs = require('fs');
const path = require('path');

const SAVED_PATH = 'saved_file_names.txt';

let saved_data;
let saved_arr = [];

function helper(saved_data, saved_arr)
{
	if(!args._[0])
	{
		console.log('No file name provided');
		console.log('Please provide file name while running node from terminal.');
		process.exit(-1);
	}
	if(saved_arr.includes(args._[0]))
	{
		console.log("File exists! Try with different file Again");
		process.exit(-3);
	}
	else
	{
		fs.writeFile(args._[0], 'You are awesome', (err) => {
			if(err){
				console.log("Error occured while writing to file");
				process.exit(-4);
			} else{
				console.log('File Write Success');
				saved_arr.push(args._[0]);
				saved_data.filenames = saved_arr;
				fs.writeFileSync(SAVED_PATH, JSON.stringify(saved_data));
			}
		});
	}
}

if(fs.existsSync(SAVED_PATH))
{
	fs.readFile(SAVED_PATH, (err, data) => {
		if(err){
			console.log('Error Occured!');
			process.exit(-5);
		} else{
			saved_data = JSON.parse(data.toString());
			if(saved_data.filenames)
				saved_arr = saved_data.filenames;
			else
				saved_data = {filenames: []};
			helper(saved_data, saved_arr);
		}
	});
} else{
	saved_data = {filenames: []};
	saved_arr = [];
	helper(saved_data, saved_arr);
}	

