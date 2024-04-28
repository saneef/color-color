export function copyToClipboard(
  text,
  { onSuccess = () => {}, onFailure = () => {} } = {}
) {
  navigator.clipboard.writeText(text).then(
    function () {
      onSuccess();
    },
    function (err) {
      onFailure(err);
    }
  );
}
