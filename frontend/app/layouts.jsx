export const metadata = {
  title: "Inventory App",
  description: "Test Assessment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "Arial",
          padding: 20,
          background: "#f7f7f7",
        }}
      >
        {children}
      </body>
    </html>
  );
}
