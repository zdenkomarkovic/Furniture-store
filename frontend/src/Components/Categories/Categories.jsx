import { motion } from "framer-motion";

const Categories = () => {
  return (
    <motion.h1
      whileInView={{ scale: [0, 1], opacity: [0, 0.5, 1] }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="header-title"
    >
      Categories
    </motion.h1>
  );
};

export default Categories;
