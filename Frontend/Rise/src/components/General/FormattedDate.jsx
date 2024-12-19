import { format } from "date-fns";
import { tr } from "date-fns/locale";

export const FormattedDate = ({ dateString }) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "d MMMM yyyy HH:mm", { locale: tr });

  return <span className="formatted-date">{formattedDate}</span>;
};
