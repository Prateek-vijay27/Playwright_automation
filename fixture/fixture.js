import{test as base,expect} from "@playwright/test"

import { LoginPage } from "../pages/loginpage.js"

import {DashBoardPage} from "../pages/dashboardpage.js"

import {CoursePage} from "../pages/coursepage.js";

/**
 * @typedef {{
 *   loginPage: LoginPage,
 *   dashboardPage: DashBoardPage,
 *   coursePage: CoursePage,
 *   loggedInUser: LoginPage,
 *   loggedInOnce: LoginPage,
 * }} MyFixtures
 */

/**
 * @type {import('@playwright/test').TestType<
 *   import('@playwright/test').PlaywrightTestArgs & MyFixtures,
 *   import('@playwright/test').PlaywrightWorkerArgs
 * >}
 */

const test=base.extend({

            loginPage:async ({page},use)=>
            {
                const loginPage=new LoginPage(page)

                await use(loginPage)

            }
            ,

             loggedInUser:async ({page},use)=>
            {
                const loginPage=new LoginPage(page)

                await loginPage.goto("/login")

                await loginPage.loginToApplication("admin@email.com","admin@123") // this has to come from config or env file or json file

                await use(loginPage)


            },

              loggedInOnce:async ({page},use)=>
            {
                const loginPage=new LoginPage(page)

                await loginPage.goto("/login")

                await loginPage.loginToApplication("admin@email.com","admin@123") // this has to come from config or env file or json file

                await use(loginPage)

            }
            ,

            dashboardPage: async ({page},use)=>{

                const dashboardPage=new DashBoardPage(page)

                await use(dashboardPage)

            },

            coursePage: async ({page},use)=>{

                const coursePage=new CoursePage(page)

                await use(coursePage)

            }


})

export {test,expect}
