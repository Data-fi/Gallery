import http from "k6/http";
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export let options =  { 
  vus: 250, 
  rps: 1500,
  duration: "5m"}

export let getErrorRate = new Rate('Errors');

export default function() {
  // let res = http.get(`http://localhost:3001/listing/${Math.floor(Math.random() * (10000000 - 1) + 1)}`);
  let res = http.get(`http://localhost:5000/listing/${Math.floor(Math.random() * (10000000 - 1) + 1)}`);
  check(res, {
    '200': res => res.status === 200
  }) || getErrorRate.add(1);
}
// get 10 reqs / 100/ 1000
// export default function () {
//   for (var id = 1; id <= 1000; id++) {
//     http.get(`http://localhost:3001/listing/${id}`)
//   }
// } 
