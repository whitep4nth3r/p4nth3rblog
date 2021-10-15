import ContentfulApi from "@contentful/Api";
import { addLeadingZero } from "@utils/Date";

const defaultOptions = {
  future: true,
};

export default class ContentfulEvents extends ContentfulApi {
  /*
   * Get next single event
   */
  static async getNext() {
    const events = await this.getEvents();
    return [events[0]];
  }

  /*
   * Get all events -- future by default
   */
  static async getEvents(options = defaultOptions) {
    const dateFilter = options.future ? "date_gt" : "date_lt";
    const order = options.future ? "date_ASC" : "date_DESC";

    const date = new Date();
    const formattedDate = date.toISOString();

    const variables = { date: formattedDate, order };

    const query = `query GetEvents($date: DateTime!, $order: [EventOrder]!) {
      eventCollection(where: {${dateFilter}: $date}, order: $order) {
        items {
          sys {
            id
          }
          date
          name
          link
          description
          timeTbc
          isVirtual
          image {
            url
            description
            height
            width
          }
        }
      }
    }`;

    const response = await this.callContentful(query, variables);

    const eventCollection = response.data.eventCollection.items
      ? response.data.eventCollection.items
      : [];

    return eventCollection;
  }
}
