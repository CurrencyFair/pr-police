// formatting a date

const intervals = [
  { seconds: 365 * 24 * 60 * 60, name: 'year',   plural: 'years' },
  { seconds:  30 * 24 * 60 * 60, name: 'month',  plural: 'months' },
  { seconds:       24 * 60 * 60, name: 'day',    plural: 'days' },
  { seconds:            60 * 60, name: 'hour',   plural: 'hours' },
  { seconds:            60 * 60, name: 'hour',   plural: 'hours' },
  { seconds:                 60, name: 'minute', plural: 'minutes' },
  { seconds:                  1, name: 'second', plural: 'seconds' },
];

module.exports.time_elapsed_string = function(from, suffix) {
  // from is a date object
  const elapsed = (Date.now() - from) / 1000;
  if (elapsed < 1) {
    return 'just now';
  }
  const interval = intervals.find(val => elapsed > val.seconds);
  const emoji = interval.name === 'month' ? ':warning:' : ':star:';
  const amount = Math.round(elapsed / interval.seconds);

  return `${emoji} [${amount} ${amount > 1 ? interval.plural : interval.name}${suffix}]`;
};

module.exports.add_jira_link_to_title = function(title) {
  const regex = /#\w+-\d+/;
  const titleMatch = title.match(regex);
  const jiraLinkPrefix = 'https://webuildgreatproduct.atlassian.net/browse/';

  if (titleMatch) {
    const ticketNumber = titleMatch[0].replace('#', '');
    return title.replace(titleMatch[0], `<${jiraLinkPrefix}${ticketNumber}|${titleMatch[0]}>`);
  }
  return title;
}