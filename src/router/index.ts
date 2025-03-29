import { createRouter, createWebHistory } from "vue-router";
import ConfigurableReports from "../views/ConfigurableReports.vue";
import ReportListView from "../views/ReportListView.vue";
import ManageReportView from "../views/ManageReportView.vue";
import SegmentListView from "../views/SegmentListView.vue";
import ConfigReportView from "../views/ConfigReportView.vue";
import PrintReportView from "../views/PrintReportView.vue";

const routes = [
  { path: "/", component: ConfigurableReports },
  { path: "/reports", component: ReportListView },
  { path: "/manage-report/:code", component: ManageReportView },

  // ✅ Nueva ruta agregada para redirigir tras crear el reporte
  { path: "/reports/:code/configuration", component: SegmentListView },

  { path: "/reports/:code/segments", component: SegmentListView },
  { path: "/reports/:code/segments/:segmentId/configure", component: ConfigReportView },
  { path: "/print-report/:code/:name", name: "PrintReport", component: PrintReportView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
