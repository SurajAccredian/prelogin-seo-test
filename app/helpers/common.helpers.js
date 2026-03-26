// common.helpers.ts
export const groupProgramsByCategory = (
  programs,
) => {
  return programs.reduce((acc, program) => {
    const { category } = program;
    if (!acc[category.toLowerCase()]) {
      acc[category.toLowerCase()] = [];
    }
    acc[category.toLowerCase()].push(program);
    return acc;
  }, {});
};

export const sortVerticalProgramsByStatus = (
  programsData,
) => {
  const statusPriority = {
    "New Launch": 1,
    "Best Selling": 2,
    "admission closed": 4,
  };
  Object.values(programsData).forEach((programs) =>
    programs.sort(
      (a, b) =>
        (statusPriority[a.status] || 3) - (statusPriority[b.status] || 3),
    ),
  );
  return programsData;
};

export const sortPrograms = (programs) => {
  return programs.sort((a, b) => {
    const priority = {
      "New Launch": 1,
      "Best Selling": 2,
      "admission closed": 4,
    };
    return (priority[a.status] || 3) - (priority[b.status] || 3);
  });
};
