
# SDC-Products API migration and optimization
Overview: Migrate existing API to new API (seamlessly) while also improving response time, throughput, and error rates under load

Objective/Target Metrics:
  <table>
  <thead>
  <tr>
  <th>Metric</th>
  <th>Target</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>⏱Response Time</td><td><2000ms under load</td>
    </tr>   
    <tr>
      <td>🎯Throughput</td><td>100RPS on EC2</td>
    </tr>    
    <tr>
      <td>⚠Error Rate</td><td><1% under load</td>
    </tr>
  </tbody>
</table>

Results/Delivered Metrics:
<table>
  <thead>
  <tr>
  <th>Metric</th>
  <th>Results</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>⏱Response Time</td><td>7-24ms under light-medium load</td>
    </tr>   
    <tr>
      <td>🎯Throughput</td><td>2575 RPS on EC2</td>
    </tr>    
    <tr>
      <td>⚠Error Rate</td><td>less than 0.7% under max load (@ 2575rps for 60s)</td>
    </tr>
  </tbody>
</table>


![sdcMetricsGoals](https://user-images.githubusercontent.com/33425993/128548373-a4f7c8c2-d248-4780-bb5c-352f9f30b616.png)
