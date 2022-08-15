export const toProperCase = (str: string) => {
    return str.replace(/(^|\s)\S/g, function (t) {
      return t.toUpperCase()
    })
  }
  