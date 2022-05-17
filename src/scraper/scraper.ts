import { CronJob } from "cron";
import cheerio from "cheerio";
import puppeteer from "puppeteer";
import SiteService from "@services/Site";
import Site from "@models/Site";
import { AxiosError } from "axios";
import logger from "@utils/logger";

export const job = new CronJob("0 */1 * * * *", function onTick() {
  logger.info(`Starting job at ${Date()}`);
  SiteService.all()
    .then((sites: Site[]) => {
      if (sites.length === 0) {
        logger.info("No site found! Exiting current Job.");
        return;
      }

      sites.forEach((site: Site) => {
        puppeteer
          .launch()
          .then(browser => browser.newPage())
          .then(page => {
            return page.goto(site.url).then(function() {
              return page.content();
            });
          })
          .then(html => {
            const $: CheerioStatic = cheerio.load(html);
            console.log(
              `Found ${$(site.selector).length} matches for site ${site.name}`
            );
          })
          .catch((err: any) => {
            logger.error(
              `Error fetching data for site ${site.name}`,
              err.message
            );
          });
      });
    })
    .catch((err: AxiosError) => {
      logger.error("Error fetching sites! Message:", err.message);
    });
});
