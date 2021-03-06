import { http, apiConfig } from '@api/base';
import { prepareSumQuery } from '@api/utils';
import { orderSerializer as serializer } from './serializers';

const orderURL = '/acquisition/orders/';

const get = async pid => {
  const response = await http.get(`${orderURL}${pid}`);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const create = async data => {
  const resp = await http.post(`${orderURL}`, data);
  resp.data = serializer.fromJSON(resp.data);
  return resp;
};

const update = async (pid, data) => {
  const response = await http.put(`${orderURL}${pid}`, data);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const list = async query => {
  const response = await http.get(`${orderURL}?q=${query}`);
  response.data.total = response.data.hits.total;
  response.data.hits = response.data.hits.hits.map(hit =>
    serializer.fromJSON(hit)
  );
  return response;
};

const count = async query => {
  const response = await http.get(`${orderURL}?q=${query}`);
  response.data = response.data.hits.total;
  return response;
};

class QueryBuilder {
  constructor() {
    this.patronQuery = [];
    this.recipientQuery = [];
    this.vendorQuery = [];
    this.vendorPidQuery = [];
    this.sortByQuery = '';
    this.stateQuery = [];
  }

  withState(state) {
    if (!state) {
      throw TypeError('State argument missing');
    }
    this.stateQuery.push(`status:${prepareSumQuery(state)}`);
    return this;
  }

  withPatron(patronPid) {
    if (!patronPid) {
      throw TypeError('Patron PID argument missing');
    }
    this.patronQuery.push(`order_lines.patron_pid:${patronPid}`);
    return this;
  }

  withRecipient(recipient) {
    if (!recipient) {
      throw TypeError('Recipient argument missing');
    }
    this.recipientQuery.push(`recipient:${recipient}`);
    return this;
  }

  withVendor(name) {
    if (!name) {
      throw TypeError('Vendor name argument missing');
    }
    this.vendorQuery.push(`vendor.name:"${name}"`);
    return this;
  }

  withVendorPid(pid) {
    if (!pid) {
      throw TypeError('Vendor pid argument missing');
    }
    this.vendorPidQuery.push(`vendor_pid:${pid}`);
    return this;
  }

  sortBy(order = 'bestmatch') {
    this.sortByQuery = `&sort=${order}`;
    return this;
  }

  qs() {
    const searchCriteria = this.patronQuery
      .concat(this.recipientQuery, this.vendorQuery, this.vendorPidQuery)
      .concat(this.stateQuery)
      .join(' AND ');
    return `${searchCriteria}${this.sortByQuery}`;
  }
}

const queryBuilder = () => {
  return new QueryBuilder();
};

export const orderApi = {
  searchBaseURL: `${apiConfig.baseURL}${orderURL}`,
  get: get,
  create: create,
  update: update,
  list: list,
  count: count,
  query: queryBuilder,
  serializer: serializer,
};
