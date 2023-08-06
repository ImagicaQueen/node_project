const result = (
  type,
  success,
  message,
  status,
  data,
  count,
  offset,
  per_page,
  curr_page,
  prev_page,
  next_page
) => {
  switch (type) {
    case 'list':
      return {
        setting: {
          success,
          message,
          status,
          count,
          offset,
          per_page,
          curr_page,
          prev_page,
          next_page,
        },
        data,
      };
    default: {
      const obj = { success, message, status, data: data };
      return obj;
    }
  }
};
module.exports = result;
