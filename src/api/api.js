import { fixtures } from "./fixtures";
import { validate as uuidValidate } from "uuid";

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

      if (query.filter.date) {
        filtered = filtered.filter((f) => {
          const time = new Date(f.createdAt).getTime();

          const startDate = new Date(query.filter.date);
          startDate.setHours(0, 0, 0, 0);

          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 1);

          return startDate.getTime() <= time && time <= endDate.getTime();
        });
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

  delete: (id) => {
    const index = fixtures.findIndex((f) => f.id === id);
    if (index !== -1) {
      fixtures.splice(index, 1);
    }
  },
};
