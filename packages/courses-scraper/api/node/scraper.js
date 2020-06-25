const puppeteer = require('puppeteer');

// convert 24 hours to seconds
const timeToSeconds = (hour) => {
    let splitTimes = hour.split(":")
    let hourSeconds = parseInt(splitTimes[0]) * 3600
    let minuteSeconds = parseInt(splitTimes[1]) * 60
    return hourSeconds + minuteSeconds
}

// return an array of all locations for the current section
const formatLocations = (rawLocations, fullCourseCode) => {


    // skip every location since it's for the next semester
    if (fullCourseCode[8] === "Y") {
        let allLocations = []

        for (let i = 0; i < rawLocations.length; i += 2) {
            allLocations.push(rawLocations[i])
        }

        return allLocations
    }
    else {
        return rawLocations
    }

}

const formatDays = (rawDays) => {
    let strippedDays = rawDays.replace(/^\s+|\s+$/g, '').split("\n")
    strippedDays.forEach((day, index, arr) => {
        if (day === "MO") {
            arr[index] = "MONDAY"
        }
        else if (day === "TU") {
            arr[index] = "TUESDAY"
        }
        else if (day === "WE") {
            arr[index] = "WEDNESDAY"
        }
        else if (day === "TH") {
            arr[index] = "THURSDAY"
        }
        else if (day === "FR") {
            arr[index] = "FRIDAY"
        }
    })

    return strippedDays
}

// return a times array matching the api requirements
const formatTimes = (rawStart, rawEnd, rawDays, rawLocations, fullCourseCode) => {
    let strippedStart = rawStart.replace(/^\s+|\s+$/g, '').split("\n")
    strippedStart.forEach((time, index, arr) => {
        // convert times to seconds
        arr[index] = timeToSeconds(time)
    })
    let strippedEnd = rawEnd.replace(/^\s+|\s+$/g, '').split("\n")
    strippedEnd.forEach((time, index, arr) => {
        // convert times to seconds
        arr[index] = timeToSeconds(time)
    })

    let strippedLocations = formatLocations(rawLocations, fullCourseCode)
    let strippedDays = formatDays(rawDays)
    let allTimes = []

    for (let i = 0; i < strippedStart.length; i++) {
        let currDuration = strippedEnd[i] - strippedStart[i]

        let currTime = {
            day: strippedDays[i],
            start: strippedStart[i],
            end: strippedEnd[i],
            duration: currDuration,
            location: strippedLocations[i]
        }

        allTimes.push(currTime)
    }

    return allTimes
}

const formatLevel = (courseCode) => {
    if (courseCode[3] === '1') {
        return 100
    }
    else if (courseCode[3] === '2') {
        return 200
    }
    else if (courseCode[3] === '3') {
        return 300
    }
    else if (courseCode[3] === '4') {
        return 400
    }
}

const formatCourseCode = (rawTitle) => {
    return rawTitle.split(" - ")[0]
}

const formatName = (rawTitle) => {
    let tempName = rawTitle.split(" - ")[1]
    // remove the distribution
    return tempName.slice(0, tempName.length - 6)
}

const formatBreadths = (rawBreadths) => {
    if (rawBreadths === "(SCI)") {
        return [1]
    }
    else if (rawBreadths === "(SSc)") {
        return [2]
    }
    else if (rawBreadths === "(HUM)") {
        return [3]
    }

}

const formatID = (courseCode) => {
    // fall or full year course
    if (courseCode[8] === 'F' || courseCode[8] === 'Y') {
        return `${courseCode}20209`
    }
    else { // winter course
        return `${courseCode}20211`
    }
}

// returns a array of instructors
const formatInstructor = (rawInstructor) => {
    let tempInstructors = rawInstructor.replace(/^\s+|\s+$/g, '')
    if (tempInstructors != "") {
        return tempInstructors.split("\n");
    }
    else {
        return []
    }
}

const formatDescription = (rawDescription) => {
    return rawDescription.split("\n\n")[0].replace("\n", " ")
}

const formatPrereqs = (rawDescription) => {
    let tempPrereqs = rawDescription.split("\n\n")
    let prereqs = ""
    for (let i = 0; i < tempPrereqs.length; i++) {
        if (tempPrereqs[i].includes("Prerequisites:")) {
            prereqs = tempPrereqs[i].slice(15, tempPrereqs[i].length)
            break;
        }
    }

    return prereqs.replace(/^\s+|\s+$/g, '').replace("\n", " ")
}

const formatExclusions = (rawDescription) => {
    let tempExclusions = rawDescription.split("\n\n")
    let exclusions = ""
    for (let i = 0; i < tempExclusions.length; i++) {
        if (tempExclusions[i].includes("Exclusion:")) {
            exclusions = tempExclusions[i].slice(11, tempExclusions[i].length)
            break;
        }
    }

    return exclusions.replace(/^\s+|\s+$/g, '').replace("\n", " ")
}

const formatTerm = (courseCode) => {
    // fall course
    if (courseCode[8] === 'F') {
        return "2020 Fall"
    }
    // winter cours 
    else if (courseCode[8] === 'S') {
        return "2021 Winter"
    }
    // full year course
    else {
        return "2020 Full Year"
    }
}


const scrape = async () => {

    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    // await page.goto('https://student.utm.utoronto.ca/timetable/', { waitUntil: 'networkidle0' });

    // get list of all courses offered at UTM
    // let courseCodes = await page.evaluate(() => {
    //     // the fourth drop down contains the data for all courses
    //     let allCoursesDiv = document.querySelectorAll("div.selectize-dropdown-content")[3].querySelectorAll("div")
    //     let codes = []
    //     for (let courseDiv of allCoursesDiv) {
    //         codes.push(courseDiv.innerText)
    //     }
    //     return codes
    // });


    let courseCode = "ECO100Y5"

    await page.goto(`https://student.utm.utoronto.ca/timetable?course=${courseCode}`, { waitUntil: 'networkidle0' });

    // returns an array of objects containing info for all courses matching the currentCourseCode
    let coursesRawInfo = await page.evaluate(() => {

        // array of courses raw info
        let allCoursesRawInfo = document.querySelectorAll("div.course")
        let finalCourses = []

        for (let rawCourseInfo of allCoursesRawInfo) {


            // object containing all info about the current course
            let courseInfo = {
                rawTitle: rawCourseInfo.querySelector("span > h4").innerText,
                rawBreadths: rawCourseInfo.querySelector("span > h4 > b").innerText,
                rawDescription: rawCourseInfo.querySelector("div.infoCourseDetails").innerText,
                rawMeetingSections: []
            }

            // raw html for all the sections
            let allSectionDivs = rawCourseInfo.querySelectorAll("tr.meeting_section")

            for (let currSectionDiv of allSectionDivs) {

                let currSecInfo = [] // array of all data for the current section
                let rawInfo = currSectionDiv.querySelectorAll("td")

                if (rawInfo.length < 11) {
                    continue
                }

                for (let currInfo of rawInfo) {
                    currSecInfo.push(currInfo.innerText)
                }

                let allLocations = []
                for (let rawLocations of rawInfo[10].querySelectorAll("span")) {
                    allLocations.push(rawLocations.innerText)
                }

                // override the location to be a list of the location data
                currSecInfo[10] = allLocations

                courseInfo.rawMeetingSections.push(currSecInfo)

            }

            finalCourses.push(courseInfo)
        }

        return finalCourses

    });

    // console.log(coursesRawInfo)

    for (let currCourseRawInfo of coursesRawInfo) {
        let currCourseData = {
            id: "",
            code: "",
            name: "",
            description: "",
            division: "University of Toronto Mississauga",
            department: "NA",
            prerequisites: "",
            exclusions: "",
            level: 0,
            campus: "UTM",
            term: "",
            breadths: [],
            meeting_sections: []
        }

        // full code with semester
        let fullCourseCode = formatCourseCode(currCourseRawInfo.rawTitle)

        // current course data
        currCourseData.name = formatName(currCourseRawInfo.rawTitle)
        currCourseData.description = formatDescription(currCourseRawInfo.rawDescription)
        currCourseData.prerequisites = formatPrereqs(currCourseRawInfo.rawDescription)
        currCourseData.exclusions = formatExclusions(currCourseRawInfo.rawDescription)
        currCourseData.breadths = formatBreadths(currCourseRawInfo.rawBreadths)

        // data that only needs the courseCode
        currCourseData.id = formatID(fullCourseCode)
        currCourseData.code = fullCourseCode
        currCourseData.level = formatLevel(fullCourseCode)
        currCourseData.term = formatTerm(fullCourseCode)

        for (let rawSectionInfo of currCourseRawInfo.rawMeetingSections) {

            let currMeetingSection = {
                code: "",
                instructors: [],
                times: [],
                size: 0,
                enrolment: 0
            }

            currMeetingSection.code = rawSectionInfo[1]
            currMeetingSection.instructors = formatInstructor(rawSectionInfo[2])
            currMeetingSection.times = formatTimes(rawSectionInfo[8], rawSectionInfo[9], rawSectionInfo[7], rawSectionInfo[10], fullCourseCode)
            currMeetingSection.size = rawSectionInfo[4]
            currMeetingSection.enrolment = rawSectionInfo[3]

            currCourseData.meeting_sections.push(currMeetingSection)

        }


        console.log(JSON.stringify(currCourseData))
    }



    await browser.close();
}

// Start the scraper
scrape();