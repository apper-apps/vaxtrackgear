import vaccinesData from "@/services/mockData/vaccines.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const VaccineService = {
  async getAll() {
    await delay(300);
    return [...vaccinesData];
  },

  async getById(id) {
    await delay(200);
    const vaccine = vaccinesData.find(v => v.Id === parseInt(id));
    if (!vaccine) {
      throw new Error("Vaccine not found");
    }
    return { ...vaccine };
  },

  async create(vaccineData) {
    await delay(500);
    const highestId = Math.max(...vaccinesData.map(v => v.Id), 0);
    const newVaccine = {
      Id: highestId + 1,
      ...vaccineData
    };
    vaccinesData.push(newVaccine);
    return { ...newVaccine };
  },

  async update(id, updatedData) {
    await delay(300);
    const index = vaccinesData.findIndex(v => v.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Vaccine not found");
    }
    vaccinesData[index] = { ...vaccinesData[index], ...updatedData };
    return { ...vaccinesData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = vaccinesData.findIndex(v => v.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Vaccine not found");
    }
    const deletedVaccine = vaccinesData.splice(index, 1)[0];
    return { ...deletedVaccine };
  }
};