
// Filtering data in column level with lowercase and uppercase

export default function filterCaseInsensitive(filter, row){
    const id = filter.pivotId || filter.id;
    const content = row[id];
    if (typeof content !== 'undefined') {

        if (typeof content === 'object' && content !== null && content.key) {
        return String(content.key).toLowerCase().includes(filter.value.toLowerCase());
      } else {
        return String(content).toLowerCase().includes(filter.value.toLowerCase());
      }
    }
    return true;
  };