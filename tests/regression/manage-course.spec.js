import {test,expect} from "../../fixture/fixture.js"

import { CategoryPage } from "../../pages/categorypage.js";

import { readExcel } from "../../utils/readexcel.js"

import courseData from "../../data/json/course.json" with { type: "json" }

const excelRows = readExcel("./data/excel/course.xlsx", "Course")

//object
const excelCourseData = 
{
    courseName: excelRows[0].courseName,

    thumbnailPath: excelRows[0].thumbnailPath,

    description: excelRows[0].description,

    instructorName: excelRows[0].instructorName,

    price: excelRows[0].price,

    category: excelRows[0].category,

    dates: 
    [
        { month: excelRows[0].date1Month, year: excelRows[0].date1Year, date: excelRows[0].date1Date },
        { month: excelRows[0].date2Month, year: excelRows[0].date2Year, date: excelRows[0].date2Date }
    ]
}


test.describe("Manage Course",()=>{

    // These tests create and delete data on the same shared application.
    test.describe.configure({ mode: 'serial', timeout: 60000 })

    async function createCategory(page, dashboardPage, categoryName)
    {
        await dashboardPage.clickOnManageButton()
        const categoryWindow=await dashboardPage.clickOnManageCategory()
        const categoryPage=new CategoryPage(categoryWindow)

        await categoryPage.clickOnAddNewCategory(categoryName)
        await expect(await categoryPage.categoryInTable(categoryName)).toBeVisible({ timeout: 15000 })
        await categoryWindow.close()
        await page.bringToFront()
    }

    test("Courses all actions test", async ({page,loggedInUser,dashboardPage,coursePage}, testInfo)=>
    {
        const timestamp=Date.now()
        const categoryName=`PW-${testInfo.project.name}-${timestamp}`
        const courseName=`${courseData.courseName} ${testInfo.project.name} ${timestamp}`

        await createCategory(page, dashboardPage, categoryName)

        console.log(categoryName)

        await dashboardPage.clickOnManageButton()

        await dashboardPage.clickOnManageCourse()

        await coursePage.clickOnAddNewCourse()

        await coursePage.enterCourseName(courseName)

        await coursePage.uploadFile(courseData.thumbnailPath)

        await coursePage.enterCourseDescription(courseData.description)

        await coursePage.enterTrainerName(courseData.instructorName)

        await coursePage.enterPrice(courseData.price)

        await coursePage.selectCurrentMonth()

        await coursePage.selectDates(courseData.dates[0].month,courseData.dates[0].year,courseData.dates[0].date)

        await coursePage.selectNextMonth()

        await coursePage.selectDates(courseData.dates[1].month,courseData.dates[1].year,courseData.dates[1].date)

        await coursePage.clickOnCategory(categoryName)

        await coursePage.clickOnSave()

        await expect(coursePage.courseRow(courseName)).toBeVisible()

        await coursePage.clickOnDeleteButton(courseName)

        await expect(coursePage.courseRow(courseName)).not.toBeVisible({ timeout: 15000 })


    })

     test("Courses all actions test with excel", async ({page,loggedInUser,dashboardPage,coursePage}, testInfo)=>
    {
        const timestamp=Date.now()
        const categoryName=`PW-${testInfo.project.name}-${timestamp}`
        const courseName=`${excelCourseData.courseName} ${testInfo.project.name} ${timestamp}`

        await createCategory(page, dashboardPage, categoryName)

        await dashboardPage.clickOnManageButton();

        await dashboardPage.clickOnManageCourse()

        await coursePage.clickOnAddNewCourse()

        await coursePage.enterCourseName(courseName)

        await coursePage.uploadFile(excelCourseData.thumbnailPath)

        await coursePage.enterCourseDescription(excelCourseData.description)

        await coursePage.enterTrainerName(excelCourseData.instructorName)

        await coursePage.enterPrice(excelCourseData.price)

        await coursePage.selectCurrentMonth()

        await coursePage.selectDates(excelCourseData.dates[0].month,excelCourseData.dates[0].year,excelCourseData.dates[0].date)

        await coursePage.selectNextMonth()

        await coursePage.selectDates(excelCourseData.dates[1].month,excelCourseData.dates[1].year,excelCourseData.dates[1].date)

        await coursePage.clickOnCategory(categoryName)

        await coursePage.clickOnSave()

        await expect(coursePage.courseRow(courseName)).toBeVisible()

        await coursePage.clickOnDeleteButton(courseName)

        await expect(coursePage.courseRow(courseName)).not.toBeVisible({ timeout: 15000 })


    })


})
