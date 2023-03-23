// import packages
const fs = require('fs');
const dotenv = require('dotenv');

// load env variables
dotenv.config()

// import db
const { connectDb } = require('./mongo')

// connect to db
const db = connectDb()

// list of banned words
const bannedWords = [
    "penis",
    "cock",
    "dick",
    "pussy",
    "clit",
    "vagina",
    "rape",
    "sex",
    "horny",
    "nude",
    "trade pic",
    "m or f",
    "f or m",
    "girl?",
    "female?",
    "boy or girl",
    "girl or boy",
    "male or female",
    "female or male",
    "boobs",
    "tits",
]

// regex to detect if someone says something like m12 or f90
const GenderRegex = '(^|[ ])((?i)[M|F]\s?\d\d)'

// get the data 
const getData = async () => {
    let data = await db.collection('filter_logs').find({ input: {$ne: null }, output: {$ne: null} }).toArray()

    return data
}

// format
const formatter = async() => {
    console.log('Got data...')
    let dbData = await getData()

    let newData = []

    console.log('Starting...')

    // go through every object in the dbData
    dbData.forEach((item) => {
        console.log('Formatting item...')
        
        let punishment = item.output

        if (punishment == "") {
            return
        }

        if (punishment == "None") {
            return
        }

        let messages = item.input

        // go through every message in the messages array
        messages.forEach((msg) => {

            for (let i = 0; i < bannedWords.length; i++) {
                if (msg.toLowerCase().includes(bannedWords[i])) {
                    
                    let formattedData = {
                        input: msg,
                        output: punishment
                    }

                    newData.push(formattedData)

                }
            }
                

        })
        console.log('Done formatting item...')

    })

    console.log('Done')
    // write the data to a file
    fs.writeFileSync('../newData.json', JSON.stringify(newData))
}

formatter()