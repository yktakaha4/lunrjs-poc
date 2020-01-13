const clean = (input) => {
  return String(input)
      .normalize('NFKC')
      .replace(/[ぁ-ん]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0x60))
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
};

module.exports = {
  clean,
};
