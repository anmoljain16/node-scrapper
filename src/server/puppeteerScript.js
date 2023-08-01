// puppeteerScript.js
const puppeteer = require('puppeteer');

async function runPuppeteerScript() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Your Puppeteer script code here
  await page.goto(
    'https://ums.lpu.in/Placements/')

    await page.type('#txtUserName', '12006518');
    await page.type('#txtPassword', 'Lords@123!');

    
    const searchResultSelector = '#Button1';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    console.log("Logged in successfully")
    
    await page.goto(
      'https://ums.lpu.in/Placements/frmPlacementDriveRegistration.aspx')
   
    
    
        let text = await page.evaluate( () => 
          Array.from(document.querySelectorAll('.aspGridView_RowStyle'), (e)=>({
            driveCode : e.querySelectorAll("td")[0].innerText,
            driveDate : e.querySelectorAll("td")[1].innerText,
            RegisterBy : e.querySelectorAll("td")[2].innerText,
            Company : e.querySelectorAll("td")[3].innerText,
            StreamEligible : e.querySelectorAll("td")[4].innerText,
            Venue : e.querySelectorAll("td")[5].innerText,
            JobProfile : e.querySelectorAll("td")[6].innerText,
            Status : e.querySelectorAll("td")[7].innerText,
            
          }) )
          )
        
    

        console.log(text)

  await browser.close();
}

module.exports = runPuppeteerScript;
