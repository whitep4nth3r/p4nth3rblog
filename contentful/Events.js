import ContentfulApi from "@contentful/Api";
import { addLeadingZero } from "@utils/Date";

const defaultOptions = {
  future: true,
};

export default class ContentfulEvents extends ContentfulApi {
  /*
   * Get all events -- future by default
   */
  static async getEvents(options = defaultOptions) {
    const dateFilter = options.future ? "date_gt" : "date_lt";

    const date = new Date();

    // YYYY-MM-DD
    const dateString = `${date.getFullYear()}-${addLeadingZero(
      date.getMonth() + 1,
    )}-${addLeadingZero(date.getDate())}`;

    const query = `{
      eventCollection(where: {${dateFilter}: "${dateString}"}, order: date_ASC) {
        items {
          sys {
            id
          }
          date
          name
          link
          description
          timeTbc
          image {
            url
            description
            height
            width
          }
        }
      }
    }`;

    const response = await this.callContentful(query);

    const eventCollection = response.data.eventCollection.items
      ? response.data.eventCollection.items
      : [];

    return eventCollection;
  }
}
