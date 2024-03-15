const getCountryQuery = (code: string) => `
    query Query {
        country(code: "${code}") {
          continent {
            name
          }
          currency
          emoji
          emojiU
          languages {
            name
            native
          }
          name
          native
          phone
          states {
            name
          }
        }
    }
  `;

const getContinentQuery = (code: string) => `
    query Query {
      continent(code: "${code}") {
        countries {
          name
          code
        }
        name
      }
    }
  `;

module.exports = {getContinentQuery, getCountryQuery};
