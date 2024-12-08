export const formatTimeAgo = (date: Date) => {
  const now = new Date().getTime();
  const diffInSeconds = Math.floor((now - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec${diffInSeconds === 1 ? "" : "s"} ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  } else if (diffInSeconds < 31104000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} month${months === 1 ? "" : "s"} ago`;
  } else if (diffInSeconds < 311040000) {
    const years = Math.floor(diffInSeconds / 31104000);
    return `${years} yr${years === 1 ? "" : "s"} ago`;
  } else {
    const decades = Math.floor(diffInSeconds / 311040000);
    return `${decades} decade${decades === 1 ? "" : "s"} ago`;
  }
};

export const formatToDate = (
  input: string,
  timeZone: string = "Asia/Singapore"
): Date => {
  // Match parts of the input string
  const regex =
    /^(?<month>\w{3}) (?<day>\d{1,2}), (?<time>\d{1,2}:\d{2} (AM|PM))$/i;
  const match = input.match(regex);

  if (!match || !match.groups) {
    throw new Error(
      "Invalid date format. Expected format: 'MMM DD, hh:mm AM/PM'."
    );
  }

  const { month, day, time } = match.groups;
  const currentYear = new Date().getFullYear();
  const dateString = `${month} ${day} ${currentYear} ${time}`;

  // Convert to a Date object
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Unable to parse the date. Check the input format.");
  }

  // Adjust to the target time zone using Intl.DateTimeFormat
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedParts = formatter.formatToParts(date);

  const getPart = (type: string) =>
    formattedParts.find((part) => part.type === type)?.value || "00";

  const adjustedDateString = `${getPart("year")}-${getPart("month")}-${getPart(
    "day"
  )}T${getPart("hour")}:${getPart("minute")}:${getPart("second")}`;
  const adjustedDate = new Date(adjustedDateString);

  return adjustedDate;
};

export const formatFirstSentence = (htmlString: string): string => {
  // Remove h4 tags but keep content
  const strippedHtml = htmlString.replace(/<h4.*?>(.*?)<\/h4>/s, "$1");

  // Regex to find the first sentence, including those ending with line breaks
  const firstSentenceMatch = strippedHtml.match(/^(.*?[.!?](?:\s*\n|\s|$))/s);

  if (firstSentenceMatch) {
    const fullMatch = firstSentenceMatch[0]; // Get the complete matched string
    const firstSentence = firstSentenceMatch[1].trim();
    const restOfString = strippedHtml.slice(fullMatch.length).trim();

    return `<div class="flex flex-col gap-2">
      <span class="font-medium !text-sm">${firstSentence}</span>
      <p class="post-content opacity-70">${restOfString}</p>
    </div>`;
  }

  // Fallback if no sentence-ending punctuation is found
  return `<div class="font-bold text-sm">${strippedHtml}</div>`;
};
