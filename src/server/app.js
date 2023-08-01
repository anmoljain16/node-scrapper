const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
let browser;
let page;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next()
});

const login = async (id, password) => {
  try {
    console.log("trying to log in");
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page.goto('https://ums.lpu.in/Placements/');
    await page.type('#txtUserName', id);
    await page.type('#txtPassword', password);


    
    await page.click('#Button1');

    console.log("Logged in successfully");
    return true;
  } catch (error) {
    console.log("Error while login:", error);
    return false;
  }
};

app.post("/api/login", async (req, res) => {
  const { id, password } = req.body;
  const loginSuccess = await login(id, password);
  res.json({ loginSuccess });
});

const getDrivesData = async () => {
  try {
    await page.goto('https://ums.lpu.in/Placements/frmPlacementDriveRegistration.aspx');

    let text = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#ctl00_ContentPlaceHolder1_gdvPlacement tr'), (e) => {
            const tds = e.querySelectorAll("td");
            let jobProfileLinks = "none"; 
        
            const anchors = e.querySelectorAll('a');
            anchors.forEach((anchor) => {
              if (anchor.innerText === 'See Job Profile') {
                jobProfileLinks = anchor.href;
              }
            });
        
            if (tds.length >= 8) {
              return {
                driveCode: tds[0].innerText,
                driveDate: tds[1].innerText,
                RegisterBy: tds[2].innerText,
                Company: tds[3].innerText,
                StreamEligible: tds[4].innerText,
                Venue: tds[5].innerText,
                JobProfile: jobProfileLinks,
                Status: tds[7].innerText,
              };
            } else {
              // Return a default value or handle the case where there are not enough td elements.
              return {
                driveCode: "",
                driveDate: "",
                RegisterBy: "",
                Company: "",
                StreamEligible: "",
                Venue: "",
                JobProfile: "",
                Status: "",
              };
            }
          });
    });

    return text;
  } catch (error) {
    console.error('Error running Puppeteer:', error);
    throw error;
  }
};

app.get("/api/drives", async (req, res) => {
  try {
    if (!page) {
      res.status(500).json({ error: 'Not logged in. Please login first.' });
      return;
    }

    const text = await getDrivesData();
    res.json(text);
    console.log("Fetching completed");
  } catch (error) {
    console.error('Error running Puppeteer:', error);
    res.status(500).json({ error: 'Error running Puppeteer' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
