import ContentfulApi from "@contentful/Api";

const defaultOptions = {
  future: true,
};

export default class ContentfulEvents extends ContentfulApi {
  /*
   * Get next single event
   */
  static async getNext() {
    const events = await this.getEvents();
    return events.length ? [events[0]] : null;
  }

  /*
   * Get all events -- future by default
   */
  static async getEvents(options = defaultOptions) {
    // Calculate date_ASC for future events, or date_DESC for past events
    const order = options.future ? "date_ASC" : "date_DESC";

    // Generate today's date
    const date = new Date();

    // And format it to an ISO String
    const formattedDate = date.toISOString();

    // Decide on the date filter to pass in as a string
    const dateFilter = options.future ? "date_gt" : "date_lt";

    // Construct variables object to send with the HTTP POST request
    const variables = { date: formattedDate, order };

    // Build the query
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

    // Call out to the base API call
    const response = await this.callContentful(query, variables);

    const eventCollection = response.data.eventCollection.items
      ? response.data.eventCollection.items
      : [];

    return eventCollection;
  }
}
