export type Region =
  | "台北市"
  | "新北市"
  | "桃園市"
  | "台中市"
  | "台南市"
  | "高雄市"
  | "基隆市"
  | "新竹市"
  | "新竹縣"
  | "苗栗縣"
  | "彰化縣"
  | "南投縣"
  | "雲林縣"
  | "嘉義市"
  | "嘉義縣"
  | "屏東縣"
  | "宜蘭縣"
  | "花蓮縣"
  | "台東縣"
  | "澎湖縣"
  | "金門縣"
  | "連江縣";

export interface Product {
  id: string;
  slug: string;
  model: string;
  name: string;
  pricePerPing: number; // NT$ per ping
  size: string; // 尺寸
  thickness: string;
  wearLayer: string; // 耐磨層
  core: string;
  features: string[];
  description: string;
  image: string; // 主圖
  detailImages?: string[]; // 細節圖
  colorCode: string; // 色號
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string; // 花色名稱
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  region: Region;
  floorSize: number; // 坪數
  suggestedUsage: string; // 建議用量（自動計算）
  constructionDate: string; // YYYY-MM-DD
  selectedColor: string; // 花色
  notes: string;
  email?: string; // 可選 email 方便聯絡
}
