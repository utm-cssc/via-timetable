const programs = [
  {
    name: 'Honours Bachelor of Science',
    color: 'green',
    programCode: 'ERCRSHBSC',
    progress: 90,
    requirements: [
      {
        desc: 'At least 20.0 Credits',
        status: 'IPR',
      },
      {
        desc: 'At least 13.0 Credits from 200+/B+ level courses',
        status: 'Done',
      },
      {
        desc: 'At least 6.0 Credits from 300+/C+ level courses',
        status: 'Done',
      },
      {
        desc:
          'No more than 1.0 Credit from 300+ TRF "Transf Cred at the 300-level/ C-level, or higher" in Req3',
        status: 'Done',
      },
      {
        desc:
          'Subject Area: No more than 15.0 Credits may have the same three-letter designator',
        status: 'Done',
      },
      {
        desc: 'Distribution requirement of 1.0 Credit from HUM courses',
        status: 'Done',
      },
      {
        desc: 'Distribution requirement of 1.0 Credit from SCI courses',
        status: 'Done',
      },
      {
        desc: 'Distribution requirement of 1.0 Credit from SSc courses',
        status: 'Done',
      },
      {
        desc: 'Minimum CGPA of 1.85',
        status: 'Done',
      },
      {
        desc:
          'Major and Minor program requirements must include at least 12.0 distinct credits',
        status: 'Done',
      },
    ],
  },
  {
    name: 'Computer Science Specialist',
    color: 'blue',
    programCode: 'ERSPE1688',
    progress: 91,
    requirements: [
      {
        desc: 'All of CSC108H5 and CSC148H5 and MAT102H5',
        status: 'Done',
      },
      {
        desc:
          'At least 1 Course from CSC290H5 or CCT110H5 or ENG100H5 or ENG110Y5 or HSC200H5 or HSC300H5 or LIN204H5 or WRI173H5 or WRI203H5',
        status: 'Done',
      },
      {
        desc:
          'At least 1.0 Credit from MAT134Y5 or MAT135Y5 or MAT137Y5 or MAT157Y5',
        status: 'Done',
      },
      {
        desc: 'All of CSC236H5 and CSC258H5 and CSC263H5',
        status: 'Done',
      },
      {
        desc: 'At least 0.5 Credits from MAT232H5 or MAT257Y5',
        status: 'Done',
      },
      {
        desc: 'At least 0.5 Credits from MAT223H5 or MAT240H5',
        status: 'Done',
      },
      {
        desc: 'At least 0.5 Credits from STA256H5 or STA257H5',
        status: 'Done',
      },
      {
        desc: 'All of CSC343H5 and CSC363H5 and CSC369H5 and CSC373H5',
        status: 'IPR',
      },
      {
        desc: 'At least 0.5 Credits from CSC358H5 or CSC458H5',
        status: 'Done',
      },
      {
        desc:
          'At least 2.5 Credits from CSC 400 level COURSES or All 3rd year CSC courses',
        status: 'Done',
      },
      {
        desc: 'At least 1.0 Credit from CSC 400 level COURSES',
        status: 'Done',
      },
    ],
  },
  {
    name: 'Math Minor',
    color: 'red',
    programCode: 'ERMIN2511',
    progress: 100,
    requirements: [
      {
        desc: 'All of MAT102H5',
        status: 'Done',
      },
      {
        desc:
          'At least 1.0 Credit from MAT134Y5 or MAT135Y5 or MAT137Y5 or MAT157Y5',
        status: 'Done',
      },
      {
        desc: 'At least 0.5 Credits from MAT223H5 or MAT240H5',
        status: 'Done',
      },
      {
        desc: 'At least 0.5 Credits from MAT212H5 or MAT224H5 or MAT232H5 or MAT240H5 or MAT247H55',
        status: 'Done',
      },
      {
        desc: 'At least 0.5 Credits from MAT 200+/B+ level courses',
        status: 'Done',
      },
      {
        desc: 'At least 1.0 Credits from MAT 300+/C+ level courses',
        status: 'Done',
      },
    ],
  },
];

export default programs;
