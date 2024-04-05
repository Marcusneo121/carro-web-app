  export const ageFromDateOfBirthday = (dateOfBirth: any): number => {
    const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        return age;
  };

  export const dateFormatterGMT = (date: any): string => {
    const anyToDate = new Date(date);
    const dateFormatted = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "GMT",
    });

    return dateFormatted
      .format(anyToDate)
      .replaceAll("/", "-")
      .replaceAll(",", "");

    // const utcFromDate = fromDate.toLocaleString("en-US", {
    //   weekday: "long",
    //   year: "numeric",
    //   month: "numeric",
    //   day: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   second: "numeric",
    //   hour12: true,
    // });
  }