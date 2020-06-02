import includeData from "nunjucks-includeData";
import nunjucks from 'nunjucks';
import {ComponentTag} from "../tasks/util/nunjucks-extensions";

export const nunj = app => {
//view engine setup
app.set('view engine', 'njk');
const env = nunjucks.configure([
    `./src/templates`,
    `./src/layout`,
    `./src/components`], {
    autoescape: true,
    express: app,
    noCache: true
});
env.addExtension('component', new ComponentTag(env));

const classesFilter = config =>
    Object.keys(config)
        .map(key => (!!config[key] ? key : null))
        .filter(v => v)
        .join(' ')
env.addFilter('classes', classesFilter);
includeData.install(env);
};

