export default function validation(state, msg) {
  let check = true;
  let message = '';
  for (const [key, value] of Object.entries(state)) {
      if (msg[key] !== undefined && value === '') {
          message = msg[key];
          check = false;
          break;
      }
  }
  return [check, message];
}

export const addKeywords = keyword => {
  let keywords = localStorage.getItem('keywords');
  keywords = keywords === null ? [] : JSON.parse(keywords);
  keywords.push(keyword);
  keywords = new Set(keywords);
  keywords = [...keywords];
  return keywords;
}

