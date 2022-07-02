import { fixtures } from "./fixtures";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export const api = {
  getAll: (query) => {
    let filtered = [...fixtures];

    if (query.filter) {
      if (query.filter.textSearch) {
        filtered = filtered.filter((f) =>
          f.title.toLowerCase().includes(query.filter.textSearch.toLowerCase())
        );
      }

      if (query.filter.type) {
        filtered = filtered.filter((f) => f.type === query.filter.type);
      }
    }

    if (query.sort) {
      if (query.sort.sortA2Z) {
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
      } else if (query.sort.sortZ2A) {
        filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
      }
    } else {
      filtered = filtered.sort(
        (a, b) => a.createdAt.getTime() < b.createdAt.getTime()
      );
    }

    const start = query.pager.page * query.pager.limit;
    return {
      items: filtered.slice(start, query.pager.limit + start),
      count: filtered.length,
    };
  },

  getByID: (id) => {
    if (!uuidValidate(id)) {
      return undefined;
    }
    return fixtures.find((f) => f.id === id);
  },

  create: (item) => {
    fixtures.push(item);
  },

  update: (item) => {
    const index = fixtures.findIndex((f) => f.id === item.id);
    if (index !== -1) {
      fixtures.splice(index, 1, item);
    }
  },
};
