/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const POST_FORM = 'boilerplate/App/POST_FORM';
export const POST_FORM_SUCCESS = 'boilerplate/App/POST_FORM_SUCCESS';
export const POST_FORM_ERROR = 'boilerplate/App/POST_FORM_ERROR';
export const DEFAULT_LOCALE = 'en';
