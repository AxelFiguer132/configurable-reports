import { defineStore } from "pinia";

interface Report {
  code: string;
  name: string;
  layoutType: string;
  columns: Array<{ id: number; tipo: string; valor: string; condicion: string; complemento: string }>;
}

export const useReportStore = defineStore("reportStore", {
  state: () => ({
    reports: [] as Report[],
  }),
  actions: {
    addReport(report: Report) {
      if (!report.code) {
        console.error("No se puede agregar un reporte sin código.");
        return;
      }
      this.reports.push(report);
    },
    updateReport(code: string, name: string, layoutType: string, columns: Report["columns"]) {
      const index = this.reports.findIndex((r) => r.code === code);
      if (index !== -1) {
        this.reports[index].name = name;
        this.reports[index].layoutType = layoutType;
        this.reports[index].columns = columns;
      }
    },
    deleteReport(code: string) {
      this.reports = this.reports.filter((r) => r.code !== code);
    },
  },
});
