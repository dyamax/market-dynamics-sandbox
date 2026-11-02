function mapClassList<S extends Record<string, string>>(
  styles: S,
  ...keys: (string | undefined)[]
) {
  return keys.filter(Boolean).map(className => styles[className as keyof S]).join(' ');
}

export default mapClassList;
