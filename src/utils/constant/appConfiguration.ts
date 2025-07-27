interface IConfigurationProps {
  appName: string;
  appCode: string;
  baseUrl: string;
  databaseResetAPI: string;
  favicon: string;
  logo: string;
  invoiceBanner:string;
  progressMessage: string;
  version: string;
}

const version = "V1.0.0";

//////////// BETA VERSION ////////////

export const appConfiguration: IConfigurationProps = {
  appName: "Proyojon e-commerce",
  appCode: "__t_beta__",
  baseUrl:"https://proyojon-backend.vercel.app/api/v1/",
  databaseResetAPI:
    "https://pos-software-with-my-sql-kry-test.vercel.app/api/v1/admin/db-reset-tebd2024",
  favicon: "/iconic.png",
  logo: "/src/assets/longeng.png",
  version,
  invoiceBanner:"",
  progressMessage:
    "Thank you for your interest! 🚀 We're currently working on implementing this feature. Stay tuned, as we'll be activating it very soon!",
};
