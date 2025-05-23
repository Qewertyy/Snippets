import { ArrowLeft, ArrowRight } from "./icons";

const styles: { [key: string]: React.CSSProperties } = {
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
    padding: "10px",
    flexDirection: "row",
  },
  paginationButton: {
    padding: "7px 7px 2px",
    border: "2px solid #E3E3E3",
    borderRadius: "10px",
    backgroundColor: "#FFF",
    cursor: "pointer",
    fontSize: "14px",
    color: "#000",
    transition: "background-color 0.3s ease",
  },
  paginationPageButton: {
    padding: "6px 12px",
    border: "2px solid #E3E3E3",
    borderRadius: "10px",
    backgroundColor: "#F5F5F5",
    cursor: "pointer",
    fontSize: "14px",
    color: "#000",
    transition: "background-color 0.3s ease",
  },
  sizeContainer: {},
  pageContainer: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
  },
};

export const Pagination = ({
  currentPage,
  totalPages,
  size,
  onPageChange,
  onSizeChange,
}: {
  currentPage: number;
  totalPages: number;
  size: number;
  onPageChange: (pageNumber: number) => void;
  onSizeChange: (size: number) => void;
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSizeChange(Number(e.target.value));
  };

  return (
    <div style={styles.paginationContainer}>
      <div style={styles.sizeContainer}>
        <span style={{ color: "#666" }}>Showing:</span>
        <select
          value={size}
          onChange={handleSizeChange}
          style={{
            padding: "4px 8px",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div style={styles.pageContainer}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={styles.paginationButton}
        >
          <ArrowLeft size={20} />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            style={{
              ...styles.paginationPageButton,
              borderColor: currentPage === index + 1 ? "#05603A" : "#E3E3E3",
              color: currentPage === index + 1 ? "#05603A" : "#000",
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={styles.paginationButton}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
