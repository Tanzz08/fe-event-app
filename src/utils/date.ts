import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";

// Helper untuk memastikan selalu ada 0 di depan (misal: 1 -> 01)
const standardTime = (time: number) => {
  return time.toString().padStart(2, "0");
};

const toDateStandard = (date: DateValue) => {
  const year = date.year;
  // GUNAKAN standardTime DISINI agar formatnya YYYY-MM-DD
  const month = standardTime(date.month); 
  const day = standardTime(date.day);

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  const result = `${year}-${month}-${day} ${standardTime(hour)}:${standardTime(minute)}:${standardTime(second)}`;

  return result;
};

const toInputDate = (date: string) => {
  if (!date) return undefined;

  // 1. Ganti spasi dengan T untuk format ISO dasar
  let isoString = date.replace(" ", "T");

  // 2. Perbaiki format Tanggal jika digit bulan/hari kurang (misal 2026-1-10 -> 2026-01-10)
  const parts = isoString.split("T");
  const datePart = parts[0];
  const timePart = parts[1] || "00:00:00";

  const [year, month, day] = datePart.split("-");
  
  // PadStart memastikan ada 2 digit (0 di depan jika perlu)
  const fixedDatePart = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  
  // 3. Gabungkan kembali dengan Timezone +07:00
  // Pastikan string akhir menjadi: YYYY-MM-DDTHH:mm:ss+07:00
  const finalIsoString = `${fixedDatePart}T${timePart}+07:00`;

  try {
    const formatedDate = parseAbsoluteToLocal(finalIsoString);
    return formatedDate;
  } catch (error) {
    console.error("Error parsing date:", finalIsoString, error);
    // Fallback atau throw error agar tidak crash total
    return undefined; 
  }
};

export { toDateStandard, toInputDate };