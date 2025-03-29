import { defineStore } from "pinia";

interface Report {
  code: string;
  name: string;
  layoutType: string; // 'empresa' o 'pais'
  columns: Array<{
    id: number;
    tipo: string;
    valor: string;
    condicion: string;
    complemento: string;
  }>;
}

export const useReportStore = defineStore("reportStore", {
  state: () => ({
    reports: [] as Report[],
  }),

  actions: {
    // ✅ Obtener reportes reales del backend y mapearlos al esquema local
    async fetchReports() {
      try {
        const res = await fetch("http://localhost:3000/externos/reports");
        const data = await res.json();

        this.reports = data.map((r: any) => ({
          code: r.reportId,
          name: r.name,
          layoutType: r.type,
          columns: [], // Se llenará luego cuando entres a editar/configurar
        }));
      } catch (error) {
        console.error("❌ Error al cargar reportes del backend:", error);
      }
    },

    addReport(report: Report) {
      if (!report.code) {
        console.error("No se puede agregar un reporte sin código.");
        return;
      }
      this.reports.push(report);
    },

    async updateReportInBackend(id: string, name: string, type: string, conditions: any[]) {
      try {
        await fetch(`http://localhost:3000/externos/reports/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, type, conditions }),
        });
        console.log(`✏️ Reporte ${id} actualizado en el backend`);
      } catch (error) {
        console.error("❌ Error al actualizar reporte en backend:", error);
        throw error;
      }
    },

    async deleteReport(code: string) {
      try {
        const res = await fetch(`http://localhost:3000/externos/reports/${code}`, {
          method: "DELETE",
        });
    
        if (!res.ok) {
          throw new Error("No se pudo eliminar el reporte");
        }
    
        this.reports = this.reports.filter((r) => r.code !== code);
        console.log(`✅ Reporte ${code} eliminado correctamente`);
      } catch (error) {
        console.error("❌ Error al eliminar el reporte:", error);
      }
    },
  },
});
