class ServerDetail {
  String baseUrl;
  String apiPath;

  ServerDetail({
    required this.baseUrl,
    required this.apiPath,
  });
}

final Map<String, ServerDetail> serverDetails = {
  'prod': ServerDetail(
    baseUrl: 'https://appdockwatch.prerakgada.in',
    apiPath: '/api/v1',
  ),
  'dev': ServerDetail(
    baseUrl: 'http://122.170.14.3:8081',
    apiPath: '',
  ),
  'local': ServerDetail(
    baseUrl: 'http://127.0.0.1:3000',
    apiPath: '/api/v1',
  ),
};
