export const getWelcomeData = async () => {
  try {
    const response = await fetch("http://localhost:3000/welcome");
    return await response.json();
  } catch (error) {
    console.error("Error fetching welcome data:", error);
    return {
      message: "",
      version: "0.0.0",
    };
  }
};
