import * as cluster from 'cluster';
const thisCluster = cluster as any as cluster.Cluster;
import * as os from 'os';
import { Injectable } from '@nestjs/common';

const numCPUs = os.cpus().length;

@Injectable()
export class AppClusterService {
  static clusterize(callback): void {
    if (thisCluster.isPrimary) {
      console.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs; i++) {
        thisCluster.fork();
      }
      thisCluster.on('exit', (worker, code, signal) => {
        console.log(code, signal);
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        thisCluster.fork();
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
